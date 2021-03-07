// The loading spinner works by being set to true to show and false to not show
export default function Loader({ show }) {
  return show ? <div className="loader"></div> : null;
}
