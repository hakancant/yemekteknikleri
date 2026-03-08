import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
  withSequence,
  runOnJS,
  interpolate,
} from 'react-native-reanimated';
import { categories } from '@/constants/recipes';

// Kategoriye göre gradient renkleri
const CATEGORY_GRADIENTS: Record<string, (string | number)[]> = {
  'et': ['#E74C3C', '#EC7063'],
  'tavuk': ['#F39C12', '#F5B041'],
  'balik': ['#3498DB', '#5DADE2'],
  'sebze': ['#27AE60', '#52BE80'],
};

function CategoryCard({
  category,
  onPress,
  delay,
}: {
  category: typeof categories[0];
  onPress: () => void;
  delay: number;
}) {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withDelay(
      delay,
      withTiming(1, { duration: 400 })
    );
    opacity.value = withDelay(
      delay,
      withTiming(1, { duration: 400 })
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { scale: scale.value },
      { translateY: interpolate(scale.value, [0, 1], [50, 0]) },
    ],
  }));

  const gradientColors = CATEGORY_GRADIENTS[category.id] || ['#FF6B35', '#FF8C42'];

  return (
    <Pressable onPress={onPress}>
      <Animated.View style={[styles.cardWrapper, animatedStyle]}>
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.categoryCard}
        >
          <View style={styles.cardLeft}>
            <View style={styles.emojiBackground}>
              <Text style={styles.categoryEmoji}>{category.emoji}</Text>
            </View>
            <View style={styles.categoryInfo}>
              <Text style={styles.categoryName}>{category.name}</Text>
              <Text style={styles.categoryMeta}>5 tarif • {getTimeRange(category.id)}</Text>
            </View>
          </View>
          <View style={styles.arrowBadge}>
            <Text style={styles.arrow}>→</Text>
          </View>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
}

function StatItem({ label, value, delay }: { label: string; value: string | number; delay: number }) {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withDelay(
      delay,
      withSpring(1, { damping: 12, stiffness: 200 })
    );
    opacity.value = withDelay(
      delay,
      withTiming(1, { duration: 300 })
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.stat, animatedStyle]}>
      <Text style={styles.statNumber}>{value}</Text>
      <Text style={styles.statText}>{label}</Text>
    </Animated.View>
  );
}

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header with Gradient */}
      <LinearGradient
        colors={['#FF6B35', '#FF8C42', '#FFA559']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          {/* Top Bar */}
          <View style={styles.topBar}>
            <View>
              <Text style={styles.greeting}>Merhaba! 👋</Text>
              <Text style={styles.title}>Bugün ne pişirsek?</Text>
            </View>
            <TouchableOpacity style={styles.searchButton}>
              <Text style={styles.searchIcon}>🔍</Text>
            </TouchableOpacity>
          </View>

          {/* Stats Card */}
          <View style={styles.statsCard}>
            <StatItem label="Tarif" value="20" delay={100} />
            <View style={styles.statLine} />
            <StatItem label="Kategori" value="4" delay={200} />
            <View style={styles.statLine} />
            <StatItem label="Favori" value="⭐" delay={300} />
          </View>
        </View>
      </LinearGradient>

      {/* Categories */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Kategoriler</Text>
          <Text style={styles.sectionSubtitle}>4 farklı kategori</Text>
        </View>

        {categories.map((category, index) => (
          <CategoryCard
            key={category.id}
            category={category}
            delay={index * 100 + 400}
            onPress={() => router.push(`/recipes?category=${category.id}&name=${encodeURIComponent(category.name)}&color=${category.color}`)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

function getTimeRange(categoryId: string): string {
  const ranges: Record<string, string> = {
    'et': '30-90 dk',
    'tavuk': '25-45 dk',
    'balik': '25-60 dk',
    'sebze': '15-60 dk',
  };
  return ranges[categoryId] || '20-60 dk';
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFBFC',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 0,
    paddingHorizontal: 0,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  headerContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 13,
    color: '#FFFFFF',
    opacity: 0.85,
    marginBottom: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  searchButton: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIcon: {
    fontSize: 20,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  statText: {
    fontSize: 11,
    color: '#FFFFFF',
    opacity: 0.85,
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statLine: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  content: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
    letterSpacing: -0.5,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#8E8E93',
  },
  cardWrapper: {
    marginBottom: 12,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 18,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  emojiBackground: {
    width: 58,
    height: 58,
    backgroundColor: 'rgba(255, 255, 255, 0.28)',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  categoryEmoji: {
    fontSize: 32,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  categoryMeta: {
    fontSize: 13,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  arrowBadge: {
    width: 36,
    height: 36,
    backgroundColor: 'rgba(255, 255, 255, 0.28)',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
