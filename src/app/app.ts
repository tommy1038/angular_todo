import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { TodoList } from './components/todo-list/todo-list';
import { TodoForm } from './components/todo-form/todo-form';
import { Todo } from './models/todo.model';

@Component({
  selector: 'app-root',
  imports: [TodoList, TodoForm],
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
}
