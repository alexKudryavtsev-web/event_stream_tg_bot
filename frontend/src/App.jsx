import { useEffect } from 'react';
import { useTelegram } from './hooks/useTelegram';

function App() {
  const { tg, user } = useTelegram();

  useEffect(() => {
    tg.ready();

    tg.MainButton.show();
    console.log(user);
  }, [tg, user]);

  return (
    <div>
      Hello, {tg.initDataUnsafe.user.username} ({tg.initDataUnsafe.user.id})
    </div>
  );
}

export default App;
