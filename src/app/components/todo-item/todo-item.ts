import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-item',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex items-center gap-3 p-3 border-b">
      <span>{{ todo().title }}</span>
    </div>
  `
})
export class TodoItem {
  readonly todo = input.required<Todo>();
}
