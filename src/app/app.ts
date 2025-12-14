import { Component, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { TodoList } from './components/todo-list/todo-list';
import { TodoForm } from './components/todo-form/todo-form';
import { TodoFilter } from './components/todo-filter/todo-filter';
import { Todo, FilterType } from './models/todo.model';

@Component({
  selector: 'app-root',
  imports: [TodoList, TodoForm, TodoFilter],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  // Phase 1: ハードコードされたダミーデータ
  protected readonly todos = signal<Todo[]>([
    {
      id: '1',
      title: 'Learn Angular Signals',
      completed: false,
      createdAt: Date.now()
    },
    {
      id: '2',
      title: 'Try Signal Forms',
      completed: true,
      createdAt: Date.now()
    },
    {
      id: '3',
      title: 'Build TODO app',
      completed: false,
      createdAt: Date.now()
    }
  ]);

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
  }

  // Phase 3: 完了切り替えと削除機能
  protected toggleTodo(id: string): void {
    this.todos.update(todos =>
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  protected deleteTodo(id: string): void {
    this.todos.update(todos => todos.filter(todo => todo.id !== id));
  }

  protected setFilter(newFilter: FilterType): void {
    this.filter.set(newFilter);
  }
}
