import { Component, ChangeDetectionStrategy, output, signal } from '@angular/core';
import { form, Field, required } from '@angular/forms/signals';

interface TodoFormData {
  title: string;
}

@Component({
  selector: 'app-todo-form',
  imports: [Field],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form (submit)="onSubmit($event)" class="mb-6">
      <div class="flex gap-2">
        <input
          [field]="todoForm.title"
          type="text"
          placeholder="Add a new todo..."
          class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
          [disabled]="todoForm.title().invalid()"
        >
          Add
        </button>
      </div>
    </form>
  `
})
export class TodoForm {
  readonly todoAdded = output<string>();

  protected readonly todoModel = signal<TodoFormData>({
    title: ''
  });

  protected readonly todoForm = form(this.todoModel, (schemaPath) => {
    required(schemaPath.title, { message: 'Title is required' });
  });

  protected onSubmit(event: Event): void {
    event.preventDefault();

    const title = this.todoModel().title.trim();
    if (title && this.todoForm.title().valid()) {
      this.todoAdded.emit(title);
      // リセット
      this.todoModel.set({ title: '' });
    }
  }
}
