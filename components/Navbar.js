import useDelay from "@/hooks/useDelay";
import { navlinks } from "@/navlinks";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 50px;
  background-color: #393e46;
  position: fixed;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 2rem 0 2rem;
`;

const NavLink = styled.div`
  width: 100px;
  height: 100%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.5rem;
  position: relative;

  &:hover {
    background-color: white;
    color: #000;
  }
`;

const SubContainer = styled.div`
  width: 300px;
  height: auto;
  background-color: #393e46;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 50px;
  left: ${({ $subposition }) => `${$subposition}px`};
  color: white;
  padding: 2rem;
  gap: 1rem;
`;

const Navbar = () => {
  const [subPosition, setSubPosition] = useState(0);
  const [currentId, setCurrentId] = useState(0);

  const [entered, setEntered] = useState(false);

  const isOpen = useDelay(entered, 2000);

  return (
    <Container>
      {navlinks.map((item, idx) => {
        return (
          <NavLink
            key={idx}
            onMouseOver={(e) => {
              setSubPosition(e.target.offsetLeft - 100);
              setCurrentId(idx);
              setEntered(true);
            }}
          >
            {item.name}
          </NavLink>
        );
      })}
      {isOpen && (
        <SubContainer
          $subposition={subPosition}
          onMouseOver={() => {
            setEntered(true);
            // setIsVisible(true);
          }}
          onMouseLeave={() => {
            setEntered(false);
          }}
        >
          {navlinks[currentId].sublinks.map((sub, id) => (
            <Link href={{ pathname: sub.link }} key={id}>
              {sub.name}
            </Link>
          ))}
        </SubContainer>
      )}
    </Container>
  );
};

export default Navbar;
