import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { getRecipesByCategory } from '@/constants/recipes';

// Kategoriye göre gradient renkleri
const CATEGORY_GRADIENTS: Record<string, (string | number)[]> = {
  'et': ['#E74C3C', '#EC7063'],
  'tavuk': ['#F39C12', '#F5B041'],
  'balik': ['#3498DB', '#5DADE2'],
  'sebze': ['#27AE60', '#52BE80'],
};

function RecipeCard({ recipe, onPress, delay }: {
  recipe: ReturnType<typeof getRecipesByCategory>[0];
  onPress: () => void;
  delay: number;
}) {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const pressedScale = useSharedValue(1);

  useEffect(() => {
    scale.value = withDelay(
      delay,
      withSpring(1, { damping: 14, stiffness: 150 })
    );
    opacity.value = withDelay(
      delay,
      withTiming(1, { duration: 350 })
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { scale: scale.value * pressedScale.value },
    ],
  }));

  const handlePressIn = () => {
    'worklet';
    pressedScale.value = withSpring(0.95, { damping: 10, stiffness: 400 });
  };

  const handlePressOut = () => {
    'worklet';
    pressedScale.value = withSpring(1, { damping: 10, stiffness: 400 });
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = { Kolay: '#27AE60', Orta: '#F39C12', Zor: '#E74C3C' };
    return colors[difficulty as keyof typeof colors] || '#666';
  };

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={onPress}>
      <Animated.View style={[animatedStyle]}>
        <View style={styles.recipeCard}>
          <View style={styles.emojiContainer}>
            <Text style={styles.recipeEmoji}>{recipe.emoji}</Text>
          </View>
          <View style={styles.recipeInfo}>
            <Text style={styles.recipeName}>{recipe.name}</Text>
            <View style={styles.recipeMeta}>
              <View style={styles.metaTag}>
                <Text style={styles.metaIcon}>⏱</Text>
                <Text style={styles.metaText}>{recipe.time}</Text>
              </View>
              <View style={[styles.metaTag, { backgroundColor: getDifficultyColor(recipe.difficulty) + '20' }]}>
                <Text style={[styles.metaText, { color: getDifficultyColor(recipe.difficulty) }]}>
                  {recipe.difficulty}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.arrowBadge}>
            <Text style={styles.arrow}>→</Text>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
}

export default function RecipesScreen() {
  const router = useRouter();
  const { category, name, color } = useLocalSearchParams();

  const decodedName = decodeURIComponent(name as string);
  const recipeList = getRecipesByCategory(category as string);
  const categoryId = category as string;

  // Header animasyonu
  const headerOpacity = useSharedValue(0);
  const headerTranslate = useSharedValue(-50);

  useEffect(() => {
    headerOpacity.value = withTiming(1, { duration: 400 });
    headerTranslate.value = withTiming(0, { duration: 400 });
  }, []);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [{ translateY: headerTranslate.value }],
  }));

  return (
    <View style={styles.container}>
      {/* Header */}
      <Animated.View style={headerAnimatedStyle}>
        <LinearGradient
          colors={CATEGORY_GRADIENTS[categoryId] || ['#FF6B35', '#FF8C42']}
          style={styles.header}
        >
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <View style={styles.backIcon}>
              <Text style={styles.backText}>←</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{decodedName}</Text>
          <View style={styles.placeholder} />
        </LinearGradient>
      </Animated.View>

      {/* Recipe List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>{recipeList.length} Tarif</Text>
          <Text style={styles.listSubtitle}>Favorine bir tane seç</Text>
        </View>

        {recipeList.map((recipe, index) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            delay={index * 80}
            onPress={() => router.push(`/recipe-detail?id=${recipe.id}`)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFBFC',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  backButton: {
    zIndex: 10,
  },
  backIcon: {
    width: 38,
    height: 38,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 38,
  },
  content: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  listHeader: {
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  listSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
  },
  recipeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  emojiContainer: {
    width: 56,
    height: 56,
    backgroundColor: '#FFF8F0',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  recipeEmoji: {
    fontSize: 30,
  },
  recipeInfo: {
    flex: 1,
  },
  recipeName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  recipeMeta: {
    flexDirection: 'row',
    gap: 8,
  },
  metaTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F5F5F7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  metaIcon: {
    fontSize: 12,
  },
  metaText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  arrowBadge: {
    width: 32,
    height: 32,
    backgroundColor: '#F5F5F7',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    fontSize: 16,
    color: '#8E8E93',
    fontWeight: '600',
  },
});
