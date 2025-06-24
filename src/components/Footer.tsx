import { NavLink } from 'react-router-dom';

import {
  FaYoutube,
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaGithub,
} from 'react-icons/fa';

// ------------------------------------------
const Footer = () => {
  return (
    <footer>
      <div>
        <ul>
          <li>Inventive</li>

          <li>
            <NavLink title='About us' to='/about'>
              About us
            </NavLink>
          </li>

          <li>
            <NavLink title='Privacy policy' to='/privacy'>
              Privacy policy
            </NavLink>
          </li>

          <li>&copy; 2025</li>
        </ul>
      </div>

      {/* Redes sociales */}
      <div>
        <a
          href='https://youtube.com'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='YouTube'
        >
          <FaYoutube />
        </a>

        <a
          href='https://x.com'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='X / Twitter'
        >
          <FaTwitter />
        </a>

        <a
          href='https://instagram.com'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Instagram'
        >
          <FaInstagram />
        </a>

        <a
          href='https://facebook.com'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Facebook'
        >
          <FaFacebook />
        </a>

        <a
          href='https://www.linkedin.com'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='LinkedIn'
        >
          <FaLinkedin />
        </a>

        <a
          href='https://github.com'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='GitHub'
        >
          <FaGithub />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
