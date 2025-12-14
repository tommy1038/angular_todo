import { Component, ChangeDetectionStrategy, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form (submit)="onSubmit($event)" class="mb-6">
      <div class="flex gap-2">
        <input
          type="text"
          [(ngModel)]="title"
          name="title"
          placeholder="Add a new todo..."
          class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          [disabled]="!title.trim()"
        >
          Add
        </button>
      </div>
    </form>
  `
})
export class TodoForm {
  readonly todoAdded = output<string>();
  protected title = '';

  protected onSubmit(event: Event): void {
    event.preventDefault();
    const trimmedTitle = this.title.trim();

    if (trimmedTitle) {
      this.todoAdded.emit(trimmedTitle);
      this.title = '';
    }
  }
}
