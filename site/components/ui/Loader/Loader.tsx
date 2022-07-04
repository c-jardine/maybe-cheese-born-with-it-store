import s from './Loader.module.css'

const Loader = () => {
  return (
    <div
      className={`${s.loader}`}
    >
      <div className={s['loader-inner']}>
        <div className={s['loader-line-wrap']}>
          <div className={s['loader-line']}></div>
        </div>
        <div className={s['loader-line-wrap']}>
          <div className={s['loader-line']}></div>
        </div>
        <div className={s['loader-line-wrap']}>
          <div className={s['loader-line']}></div>
        </div>
        <div className={s['loader-line-wrap']}>
          <div className={s['loader-line']}></div>
        </div>
        <div className={s['loader-line-wrap']}>
          <div className={s['loader-line']}></div>
        </div>
      </div>
    </div>
  )
}
export default Loader
