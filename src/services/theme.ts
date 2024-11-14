export class ThemeService {
  static initializeTheme() {
    // Verifica se o tema do usuário já foi definido no localStorage
    const savedTheme = localStorage.getItem('theme');
    
    // Se não houver tema salvo, usa o tema do sistema
    if (!savedTheme) {
      const systemTheme = ThemeService.getSystemTheme();
      document.body.classList.add(systemTheme); // Adiciona a classe 'dark' ou 'light' no body
      localStorage.setItem('theme', systemTheme); // Salva o tema inicial
    } else {
      // Se houver um tema salvo, aplica ele
      document.body.classList.add(savedTheme);
    }
  }

  private static getSystemTheme(): string {
    // Verifica a preferência do sistema
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    } else {
      return 'light';
    }
  }

  static toggleTheme() {
    const currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    // Remove a classe atual e adiciona a nova
    document.body.classList.remove(currentTheme);
    document.body.classList.add(newTheme);

    // Salva a preferência no localStorage
    localStorage.setItem('theme', newTheme);
  }
}