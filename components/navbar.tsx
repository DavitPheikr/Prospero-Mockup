import styles from "@/scss/components/navbar.module.scss"

export default function Navbar(){
    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarContainer}>
                <div className={styles.leftSection}>
                    <img src="/logo.png" alt="Logo" className={styles.logo} />
                    <div className={styles.centerSection}>
                    <button className={styles.navButton}>Account</button>
                    <button className={styles.navButton}>Statistics</button>
                </div>
                </div>
            </div>
        </nav>
    )
}