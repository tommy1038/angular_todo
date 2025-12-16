import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { FilterType } from '../../models/todo.model';

@Component({
  selector: 'app-todo-filter',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex gap-2 mb-4" role="group" aria-label="Filter todos">
      <button
        type="button"
        (click)="filterChanged.emit('all')"
        [attr.aria-pressed]="currentFilter() === 'all'"
        [class.bg-blue-500]="currentFilter() === 'all'"
        [class.text-white]="currentFilter() === 'all'"
        [class.bg-gray-200]="currentFilter() !== 'all'"
        class="px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Show all todos"
      >
        All
      </button>
      <button
        type="button"
        (click)="filterChanged.emit('active')"
        [attr.aria-pressed]="currentFilter() === 'active'"
        [class.bg-blue-500]="currentFilter() === 'active'"
        [class.text-white]="currentFilter() === 'active'"
        [class.bg-gray-200]="currentFilter() !== 'active'"
        class="px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Show active todos"
      >
        Active
      </button>
      <button
        type="button"
        (click)="filterChanged.emit('completed')"
        [attr.aria-pressed]="currentFilter() === 'completed'"
        [class.bg-blue-500]="currentFilter() === 'completed'"
        [class.text-white]="currentFilter() === 'completed'"
        [class.bg-gray-200]="currentFilter() !== 'completed'"
        class="px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Show completed todos"
      >
        Completed
      </button>
    </div>
  `
})
export class TodoFilter {
  readonly currentFilter = input.required<FilterType>();
  readonly filterChanged = output<FilterType>();
}
