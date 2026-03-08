import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import { useFavorites } from '@/contexts/FavoritesContext';
import { getRecipeById } from '@/constants/recipes';

function RecipeCard({ recipe, onPress, onDelete, delay }: {
  recipe: ReturnType<typeof getRecipeById>;
  onPress: () => void;
  onDelete: () => void;
  delay: number;
}) {
  const translateX = useSharedValue(50);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(1);
  const deleteScale = useSharedValue(0);

  useEffect(() => {
    translateX.value = withDelay(
      delay,
      withSpring(0, { damping: 12, stiffness: 150 })
    );
    opacity.value = withDelay(
      delay,
      withTiming(1, { duration: 300, easing: Easing.out(Easing.cubic) })
    );
    deleteScale.value = withDelay(delay + 300, withSpring(1, { damping: 10, stiffness: 200 }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateX: translateX.value },
      { scale: scale.value },
    ],
  }));

  const deleteAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: deleteScale.value }],
  }));

  const handlePressIn = () => {
    'worklet';
    scale.value = withSpring(0.96, { damping: 10, stiffness: 400 });
  };

  const handlePressOut = () => {
    'worklet';
    scale.value = withSpring(1, { damping: 10, stiffness: 400 });
  };

  const handleDeletePressIn = () => {
    'worklet';
    deleteScale.value = withSpring(0.85, { damping: 8, stiffness: 400 });
  };

  const handleDeletePressOut = () => {
    'worklet';
    deleteScale.value = withSpring(1, { damping: 8, stiffness: 400 });
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = { Kolay: '#27AE60', Orta: '#F39C12', Zor: '#E74C3C' };
    return colors[difficulty as keyof typeof colors] || '#666';
  };

  return (
    <View style={{ marginBottom: 12 }}>
      <Animated.View style={[animatedStyle]}>
        <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={onPress}>
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
            <View style={styles.rightSection}>
              <View style={styles.arrowBadge}>
                <Text style={styles.arrow}>→</Text>
              </View>
              <Pressable
                onPressIn={handleDeletePressIn}
                onPressOut={handleDeletePressOut}
                onPress={onDelete}
                style={styles.deleteButton}
              >
                <Animated.View style={[styles.deleteIconContainer, deleteAnimatedStyle]}>
                  <Text style={styles.deleteIcon}>❌</Text>
                </Animated.View>
              </Pressable>
            </View>
          </View>
        </Pressable>
      </Animated.View>
    </View>
  );
}

function EmptyState({ onPress }: { onPress: () => void }) {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(1, { damping: 12, stiffness: 150 });
    opacity.value = withTiming(1, { duration: 400 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.emptyContainer, animatedStyle]}>
      <Text style={styles.emptyEmoji}>💫</Text>
      <Text style={styles.emptyTitle}>Henüz favori tarifin yok</Text>
      <Text style={styles.emptyText}>
        Beğendiğin tariflere yıldıza basarak ekleyebilirsin
      </Text>
      <TouchableOpacity style={styles.exploreButton} onPress={onPress}>
        <Text style={styles.exploreButtonText}>Tarifleri Keşfet</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function FavoritesScreen() {
  const router = useRouter();
  const { favorites, toggleFavorite } = useFavorites();
  const favoriteRecipes = favorites.map(id => getRecipeById(id)).filter(Boolean);
  const [localFavorites, setLocalFavorites] = useState(favoriteRecipes);

  useEffect(() => {
    setLocalFavorites(favoriteRecipes);
  }, [favorites]);

  // Header animasyonu
  const headerScale = useSharedValue(0.8);
  const headerOpacity = useSharedValue(0);

  useEffect(() => {
    headerScale.value = withSpring(1, { damping: 10, stiffness: 150 });
    headerOpacity.value = withTiming(1, { duration: 300 });
  }, []);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [{ scale: headerScale.value }],
  }));

  const handleDelete = (recipeId: number) => {
    toggleFavorite(recipeId);
    setLocalFavorites(prev => prev.filter(r => r.id !== recipeId));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Animated.View style={headerAnimatedStyle}>
        <LinearGradient
          colors={['#FF6B35', '#FF8C42', '#FFA559']}
          style={styles.header}
        >
          <Text style={styles.headerEmoji}>⭐</Text>
          <Text style={styles.headerTitle}>Favorilerim</Text>
          <Text style={styles.headerSubtitle}>
            {localFavorites.length} favori tarif
          </Text>
        </LinearGradient>
      </Animated.View>

      {/* İçerik */}
      {localFavorites.length === 0 ? (
        <EmptyState onPress={() => router.push('/(tabs)')} />
      ) : (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>Kaydedilen Tarifler</Text>
            <Text style={styles.listSubtitle}>Çarpıya basarak silebilirsin</Text>
          </View>

          {localFavorites.map((recipe, index) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              delay={index * 70}
              onPress={() => router.push(`/recipe-detail?id=${recipe.id}`)}
              onDelete={() => handleDelete(recipe.id)}
            />
          ))}
        </ScrollView>
      )}
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
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  headerEmoji: {
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
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
  rightSection: {
    alignItems: 'center',
    gap: 8,
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
  deleteButton: {
    padding: 6,
  },
  deleteIconContainer: {
    width: 32,
    height: 32,
    backgroundColor: '#FF6B3520',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteIcon: {
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 15,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  exploreButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 16,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  exploreButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
