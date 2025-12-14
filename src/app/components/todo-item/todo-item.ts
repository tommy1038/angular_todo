import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-item',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex items-center gap-3 p-3 border-b hover:bg-gray-50" role="listitem">
      <input
        type="checkbox"
        [checked]="todo().completed"
        (change)="toggled.emit()"
        [attr.aria-label]="'Mark ' + todo().title + ' as ' + (todo().completed ? 'incomplete' : 'complete')"
        class="w-5 h-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
      />
      <span
        [class.line-through]="todo().completed"
        [class.text-gray-400]="todo().completed"
        class="flex-1"
        [attr.aria-label]="todo().completed ? 'Completed: ' + todo().title : todo().title"
      >
        {{ todo().title }}
      </span>
      <button
        (click)="deleted.emit()"
        [attr.aria-label]="'Delete ' + todo().title"
        class="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Delete
      </button>
    </div>
  `
})
export class TodoItem {
  readonly todo = input.required<Todo>();
  readonly toggled = output<void>();
  readonly deleted = output<void>();
}
