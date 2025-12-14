import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { FilterType } from '../../models/todo.model';

@Component({
  selector: 'app-todo-filter',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex gap-2 mb-4">
      <button
        (click)="filterChanged.emit('all')"
        [class.bg-blue-500]="currentFilter() === 'all'"
        [class.text-white]="currentFilter() === 'all'"
        [class.bg-gray-200]="currentFilter() !== 'all'"
        class="px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
      >
        All
      </button>
      <button
        (click)="filterChanged.emit('active')"
        [class.bg-blue-500]="currentFilter() === 'active'"
        [class.text-white]="currentFilter() === 'active'"
        [class.bg-gray-200]="currentFilter() !== 'active'"
        class="px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Active
      </button>
      <button
        (click)="filterChanged.emit('completed')"
        [class.bg-blue-500]="currentFilter() === 'completed'"
        [class.text-white]="currentFilter() === 'completed'"
        [class.bg-gray-200]="currentFilter() !== 'completed'"
        class="px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
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
