import styles from "@/scss/components/welcome.module.scss"

export default function Welcome() {
  return (
    <div className={styles.welcomeOuter}>
      <div className={styles.welcomeTextContainer}>
        <h1 className={styles.welcomeText}>
          Welcome <span className={styles.nameText}>Davit</span>
        </h1>
        <h1 className={styles.welcomeText}>Create Your First Savings Account!</h1>
      </div>
    </div>
  )
}
