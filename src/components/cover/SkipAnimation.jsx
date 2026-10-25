import './SkipAnimation.css'

export default function SkipAnimation({ onSkip }) {
  return <button className="skip-animation" onClick={onSkip}>
    ข้ามแอนิเมชัน <span aria-hidden="true">↠</span>
  </button>
}
