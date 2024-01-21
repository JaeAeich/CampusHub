import { Link } from 'react-router-dom';
import {
  Facebook, Github, Instagram, Linkedin, Twitter,
} from 'lucide-react';
import Container from '@/components/ui/container';

const routes = [
  {
    to: '/',
    label: 'Home',
  },
  {
    to: 'about',
    label: 'About',
  },
  {
    to: 'contact',
    label: 'Contact Us',
  },
  {
    to: 'terms',
    label: 'Terms & Conditions',
  },
];

export default function Footer() {
  return (
    <footer className="bg-foreground text-background pt-8 pb-2 px-2">
      <Container>
        <div className="flex flex-col items-center text-xs md:text-base">
          <div className="flex flex-wrap justify-center mb-4">
            <ul className="flex items-center space-x-4">
              {routes.map((route) => (
                <li key={route.to}>
                  <Link to={route.to}>{route.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center space-x-4">
            <Link to="/">
              <Facebook />
            </Link>
            <Link to="/">
              <Twitter />
            </Link>
            <Link to="/">
              <Instagram />
            </Link>
            <Link to="/">
              <Linkedin />
            </Link>
            <Link to="/">
              <Github />
            </Link>
          </div>
        </div>
        <div className="mt-3 py-2">
          <p className="text-center font-extralight text-xs">
            @2024 All rights reserved by Runaways
          </p>
        </div>
      </Container>
    </footer>
  );
}
