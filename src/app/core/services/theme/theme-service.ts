import { isPlatformBrowser } from '@angular/common';
import { effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  
  // تعريف الـ Signal
  isDarkMode = signal<boolean>(false);

  constructor() {
    // التأكد أننا في المتصفح قبل استخدام localStorage أو document
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme');
      this.isDarkMode.set(savedTheme === 'dark');

      // الـ effect لمراقبة التغييرات
      effect(() => {
        const mode = this.isDarkMode();
        if (mode) {
          document.documentElement.classList.add('dark');
          localStorage.setItem('theme', 'dark');
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('theme', 'light');
        }
      });
    }
  }

  toggleTheme() {
    this.isDarkMode.update(mode => !mode);
  }
  
}
