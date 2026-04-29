import { apiFetch } from './src/shared/api/client';

async function checkActiveGame() {
  try {
    const response = await apiFetch('/games/active');
    console.log('Active game found:', response);
  } catch (e) {
    console.log('No active game endpoint or none found:', e);
  }
}

// Це просто для тесту, ми не можемо запустити це як скрипт напряму без налаштування середовища
