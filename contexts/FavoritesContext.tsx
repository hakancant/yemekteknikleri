import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('favorites.db');

// Tabloyu oluştur
db.execSync(`
  CREATE TABLE IF NOT EXISTS favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    recipe_id INTEGER UNIQUE
  );
`);

interface FavoritesContextType {
  favorites: number[];
  loaded: boolean;
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    try {
      const result = db.getAllSync<any>('SELECT recipe_id FROM favorites');
      const favIds = result.map(row => row.recipe_id);
      setFavorites(favIds);
    } catch (error) {
      console.error('Favoriler yüklenirken hata:', error);
    } finally {
      setLoaded(true);
    }
  };

  const toggleFavorite = (recipeId: number) => {
    try {
      const exists = favorites.includes(recipeId);

      if (exists) {
        db.runSync('DELETE FROM favorites WHERE recipe_id = ?', [recipeId]);
        setFavorites(favorites.filter(id => id !== recipeId));
      } else {
        db.runSync('INSERT INTO favorites (recipe_id) VALUES (?)', [recipeId]);
        setFavorites([...favorites, recipeId]);
      }
    } catch (error) {
      console.error('Favori kaydedilirken hata:', error);
    }
  };

  const isFavorite = (recipeId: number) => {
    return favorites.includes(recipeId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, loaded, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
}
