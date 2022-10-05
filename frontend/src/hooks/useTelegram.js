const tg = window.Telegram.WebApp;

export function useTelegram() {
  function onClose() {
    tg.close();
  }
  return {
    tg,
    onClose,
    user: tg.initDataUnsafe.user
  };
}
