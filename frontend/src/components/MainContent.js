import Main from './Main';
import Footer from './Footer';

export default function MainContent(props) {
  return (
    <>
      <Main {...props} />
      <Footer />
    </>
  );
}
