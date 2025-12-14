import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { TodoItem } from '../todo-item/todo-item';

@Component({
  selector: 'app-todo-list',
  imports: [TodoItem],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mt-4">
      @for (todo of todos(); track todo.id) {
        <app-todo-item [todo]="todo" />
      } @empty {
        <p class="text-gray-400 text-center p-4">No todos yet</p>
      }
    </div>
  `
})
export class TodoList {
  readonly todos = input.required<Todo[]>();
}
