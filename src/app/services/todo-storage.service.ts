import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoStorageService {
  private readonly STORAGE_KEY = 'angular_todos';

  loadTodos(): Todo[] {
    // SSR対応: ブラウザ環境でのみ実行
    if (typeof window === 'undefined') {
      return [];
    }

    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to load todos from localStorage:', error);
      return [];
    }
  }

  saveTodos(todos: Todo[]): void {
    // SSR対応: ブラウザ環境でのみ実行
    if (typeof window === 'undefined') {
      return;
    }

    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error('Failed to save todos to localStorage:', error);
    }
  }
}
