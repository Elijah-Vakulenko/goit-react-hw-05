import { ProgressBar } from 'react-loader-spinner';
import s from './Loader.module.css'

const Loader = () => {
  return (
    <div className={s.wrapper}>
        <ProgressBar
          visible={true}
          height="80"
          width="250"
          barColor="#AEBF9B"
          borderColor="#5C9282"
          ariaLabel="progress-bar-loading"
        />
      </div>
  )
}

export default Loader