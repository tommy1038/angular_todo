import { Component, signal, computed, effect, inject, ChangeDetectionStrategy } from '@angular/core';
import { TodoList } from './components/todo-list/todo-list';
import { TodoForm } from './components/todo-form/todo-form';
import { TodoFilter } from './components/todo-filter/todo-filter';
import { TodoStorageService } from './services/todo-storage.service';
import { Todo, FilterType } from './models/todo.model';

@Component({
  selector: 'app-root',
  imports: [TodoList, TodoForm, TodoFilter],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  private readonly storageService = inject(TodoStorageService);

  protected readonly todos = signal<Todo[]>([]);
  protected readonly currentFilter = signal<FilterType>('all');

  // Phase 4: フィルター済みTODOリストの計算
  protected readonly filteredTodos = computed(() => {
    const todos = this.todos();
    const filter = this.currentFilter();

    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  });

  constructor() {
    // Phase 5: 初期化時にLocal StorageからTODOを読み込む
    const savedTodos = this.storageService.loadTodos();
    this.todos.set(savedTodos);

    // Phase 5: TODOが変更されたら自動保存
    effect(() => {
      const currentTodos = this.todos();
      this.storageService.saveTodos(currentTodos);
    });
  }

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
  }

  // Phase 3: 完了切り替え機能
  protected toggleTodo(id: string): void {
    this.todos.update(todos =>
      todos.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }

  // Phase 3: 削除機能
  protected deleteTodo(id: string): void {
    this.todos.update(todos => todos.filter(todo => todo.id !== id));
  }

  // Phase 4: フィルター変更
  protected changeFilter(filter: FilterType): void {
    this.currentFilter.set(filter);
  }
}
