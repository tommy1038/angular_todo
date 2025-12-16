import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoStorageService {
  private readonly STORAGE_KEY = 'angular_todos';

  // Local StorageからTODOリストを読み込む
  loadTodos(): Todo[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to load todos from localStorage:', error);
      return [];
    }
  }

  // Local StorageにTODOリストを保存する
  saveTodos(todos: Todo[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error('Failed to save todos to localStorage:', error);
    }
  }
}
