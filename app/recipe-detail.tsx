import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Pressable, Share } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
  withSequence,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import { getRecipeById } from '@/constants/recipes';
import { useFavorites } from '@/contexts/FavoritesContext';

// Kategoriye göre gradient renkleri
const CATEGORY_GRADIENTS: Record<string, (string | number)[]> = {
  'et': ['#E74C3C', '#EC7063'],
  'tavuk': ['#F39C12', '#F5B041'],
  'balik': ['#3498DB', '#5DADE2'],
  'sebze': ['#27AE60', '#52BE80'],
};

function ListItem({ children, index, delay }: {
  children: React.ReactNode;
  index: number;
  delay: number;
}) {
  const translateX = useSharedValue(-20);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateX.value = withDelay(
      delay,
      withSpring(0, { damping: 12, stiffness: 150 })
    );
    opacity.value = withDelay(
      delay,
      withTiming(1, { duration: 300 })
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      {children}
    </Animated.View>
  );
}

function IconButton({ icon, onPress, delay }: {
  icon: string;
  onPress: () => void;
  delay: number;
}) {
  const scale = useSharedValue(0);
  const pressedScale = useSharedValue(1);

  useEffect(() => {
    scale.value = withDelay(
      delay,
      withSpring(1, { damping: 10, stiffness: 200 })
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value * pressedScale.value }],
  }));

  const handlePressIn = () => {
    'worklet';
    pressedScale.value = withSpring(0.85, { damping: 8, stiffness: 400 });
  };

  const handlePressOut = () => {
    'worklet';
    pressedScale.value = withSpring(1, { damping: 8, stiffness: 400 });
  };

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={onPress}>
      <Animated.View style={[styles.iconButton, animatedStyle]}>
        <Text style={styles.iconText}>{icon}</Text>
      </Animated.View>
    </Pressable>
  );
}

export default function RecipeDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { toggleFavorite, isFavorite, loaded } = useFavorites();

  const recipe = getRecipeById(Number(id));
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    if (recipe && loaded) {
      setIsFav(isFavorite(recipe.id));
    }
  }, [recipe, loaded, isFavorite]);

  const handleShare = () => {
    if (!recipe) return;
    const message = `${recipe.emoji} ${recipe.name}\n\n⏱ Pişme Süresi: ${recipe.time}\n📊 Zorluk: ${recipe.difficulty}\n\n📋 Malzemeler:\n${recipe.ingredients.map((ing, i) => `${i + 1}. ${ing}`).join('\n')}\n\n👨‍🍳 Yapılışı:\n${recipe.instructions.map((step, i) => `${i + 1}. ${step}`).join('\n')}\n\n🍳 Yemek Teknikleri`;

    Share.share({
      message: message,
    });
  };

  const handleToggleFavorite = () => {
    if (!recipe) return;
    toggleFavorite(recipe.id);
    setIsFav(!isFav);
  };

  if (!recipe) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Tarif bulunamadı</Text>
      </View>
    );
  }

  const gradientColors = CATEGORY_GRADIENTS[recipe.category] || ['#FF6B35', '#FF8C42'];

  // Header animasyonları
  const headerOpacity = useSharedValue(0);
  const headerScale = useSharedValue(0.9);

  useEffect(() => {
    headerOpacity.value = withTiming(1, { duration: 400 });
    headerScale.value = withSpring(1, { damping: 12, stiffness: 150 });
  }, []);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [{ scale: headerScale.value }],
  }));

  // Emoji animasyonu
  const emojiRotation = useSharedValue(0);
  const emojiScale = useSharedValue(0);

  useEffect(() => {
    emojiScale.value = withDelay(
      200,
      withSequence(
        withTiming(1.2, { duration: 200, easing: Easing.out(Easing.cubic) }),
        withTiming(1, { duration: 150 })
      )
    );
    emojiRotation.value = withDelay(
      200,
      withSequence(
        withTiming('10deg', { duration: 200 }),
        withTiming('-5deg', { duration: 150 }),
        withTiming('0deg', { duration: 100 })
      )
    );
  }, []);

  const emojiAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: emojiScale.value },
      { rotate: emojiRotation.value },
    ],
  }));

  return (
    <View style={styles.container}>
      {/* Header */}
      <Animated.View style={headerAnimatedStyle}>
        <LinearGradient colors={gradientColors} style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <View style={styles.iconButton}>
                <Text style={styles.iconText}>←</Text>
              </View>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{recipe.name}</Text>
            <View style={styles.headerButtons}>
              <IconButton icon={isFav ? '⭐' : '☆'} onPress={handleToggleFavorite} delay={300} />
              <IconButton icon={'📤'} onPress={handleShare} delay={400} />
            </View>
          </View>

          {/* Emoji ve Meta */}
          <View style={styles.metaSection}>
            <Animated.View style={[styles.emojiContainer, emojiAnimatedStyle]}>
              <Text style={styles.emoji}>{recipe.emoji}</Text>
            </Animated.View>
            <View style={styles.metaTags}>
              <View style={styles.metaTag}>
                <Text style={styles.metaIcon}>⏱</Text>
                <Text style={styles.metaText}>{recipe.time}</Text>
              </View>
              <View style={styles.metaTag}>
                <Text style={styles.metaIcon}>📊</Text>
                <Text style={[styles.metaText, styles.difficultyText]}>{recipe.difficulty}</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>

      {/* İçerik */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Malzemeler */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📋 Malzemeler</Text>
            <View style={styles.sectionBadge}>
              <Text style={styles.sectionBadgeText}>{recipe.ingredients.length}</Text>
            </View>
          </View>
          {recipe.ingredients.map((ingredient, index) => (
            <ListItem key={index} index={index} delay={500 + index * 50}>
              <View style={styles.listItem}>
                <View style={styles.listNumber}>
                  <Text style={styles.listNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.listText}>{ingredient}</Text>
              </View>
            </ListItem>
          ))}
        </View>

        {/* Yapılışı */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>👨‍🍳 Yapılışı</Text>
            <View style={styles.sectionBadge}>
              <Text style={styles.sectionBadgeText}>{recipe.instructions.length}</Text>
            </View>
          </View>
          {recipe.instructions.map((instruction, index) => (
            <ListItem key={index} index={index} delay={700 + recipe.ingredients.length * 50 + index * 50}>
              <View style={styles.stepItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.stepText}>{instruction}</Text>
              </View>
            </ListItem>
          ))}
        </View>

        {/* Alt boşluk */}
        <View style={{ height: 100 }} />
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
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  headerTop: {
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    zIndex: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  metaSection: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    alignItems: 'center',
  },
  emojiContainer: {
    width: 90,
    height: 90,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emoji: {
    fontSize: 48,
  },
  metaTags: {
    flexDirection: 'row',
    gap: 12,
  },
  metaTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  metaIcon: {
    fontSize: 16,
  },
  metaText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  difficultyText: {
    color: '#FFF',
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  sectionBadge: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  sectionBadgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  listNumber: {
    width: 28,
    height: 28,
    backgroundColor: '#27AE60',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  listNumberText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  listText: {
    flex: 1,
    fontSize: 15,
    color: '#1A1A1A',
    lineHeight: 22,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  stepNumber: {
    width: 32,
    height: 32,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  stepText: {
    flex: 1,
    fontSize: 15,
    color: '#1A1A1A',
    lineHeight: 24,
  },
  errorText: {
    fontSize: 18,
    color: '#8E8E93',
    textAlign: 'center',
    marginTop: 100,
  },
});
