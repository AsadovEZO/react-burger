import { Link } from 'react-router-dom';

import styles from "../App.module.css";
import AuthStyles from "../Auth.module.css";
import AppHeader from "../components/app-header/app-header";


export function NotFound404() {
	return (
		<main className={styles.app}>
      <AppHeader />
      <section className={AuthStyles.main}>
        <p className="text text_type_main-medium">
          Запрашиваемая страница не существует О_о. 
        </p>
      </section>
      <section className={AuthStyles.main}>
      <Link to='/' className="text text_type_main-medium">Перейти на главную страницу</Link>
      </section>
    </main>
			
	)
}