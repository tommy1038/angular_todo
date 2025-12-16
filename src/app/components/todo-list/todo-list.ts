import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { TodoItem } from '../todo-item/todo-item';

@Component({
  selector: 'app-todo-list',
  imports: [TodoItem],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="mt-4" role="list" aria-label="Todo list">
      @for (todo of todos(); track todo.id) {
        <li role="listitem">
          <app-todo-item
            [todo]="todo"
            (toggled)="todoToggled.emit(todo.id)"
            (deleted)="todoDeleted.emit(todo.id)"
          />
        </li>
      } @empty {
        <li role="listitem">
          <p class="text-gray-400 text-center p-4">No todos yet</p>
        </li>
      }
    </ul>
  `
})
export class TodoList {
  readonly todos = input.required<Todo[]>();
  readonly todoToggled = output<string>();
  readonly todoDeleted = output<string>();
}
