import { Component, signal, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { TodoList } from './components/todo-list/todo-list';
import { TodoForm } from './components/todo-form/todo-form';
import { TodoFilter } from './components/todo-filter/todo-filter';
import { Todo, FilterType } from './models/todo.model';
import { TodoStorageService } from './services/todo-storage.service';

@Component({
  selector: 'app-root',
  imports: [TodoList, TodoForm, TodoFilter],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  // Phase 5: Local Storage永続化
  private readonly storageService = inject(TodoStorageService);

  // Phase 1': Local Storageから読み込み（なければ空配列）
  protected readonly todos = signal<Todo[]>(this.storageService.loadTodos());

  // Phase 4: フィルター機能
  protected readonly filter = signal<FilterType>('all');

  protected readonly filteredTodos = computed(() => {
    const allTodos = this.todos();
    const currentFilter = this.filter();

    switch (currentFilter) {
      case 'active':
        return allTodos.filter(todo => !todo.completed);
      case 'completed':
        return allTodos.filter(todo => todo.completed);
      default:
        return allTodos;
    }
  });

  // Phase 2: TODO追加機能
  protected addTodo(title: string): void {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: Date.now()
    };

    // 新しいTODOをリストの先頭に追加
    this.todos.update(todos => [newTodo, ...todos]);
    this.saveTodos();
  }

  // Phase 3: 完了切り替えと削除機能
  protected toggleTodo(id: string): void {
    this.todos.update(todos =>
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    this.saveTodos();
  }

  protected deleteTodo(id: string): void {
    this.todos.update(todos => todos.filter(todo => todo.id !== id));
    this.saveTodos();
  }

  protected setFilter(newFilter: FilterType): void {
    this.filter.set(newFilter);
  }

  // Phase 5: Local Storage保存
  private saveTodos(): void {
    this.storageService.saveTodos(this.todos());
  }
}
