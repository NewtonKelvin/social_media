import styled from "styled-components"
import Image from "next/image"
import Link from "next/link"
//Material UI
import Breadcrumbs from "@mui/material/Breadcrumbs"
//Icons
import NavigateNextIcon from "@mui/icons-material/NavigateNext"

const CustomBreadcrumb = styled.div`
  background-color: var(--primary) !important;
  text-align: center;
  margin: 20px 0;
  padding: 10px !important;
  border-radius: 10px !important;
  ol {
    justify-content: center;
    
    li:last-child {
      a {
        font-weight: bold;
      }
    }
  }
  a {
    /* font-weight: bold; */
    color: var(--white) !important;
    &::before {
      color: var(--white);
      background-color: var(--white);
    }
  }
  svg {
    color: var(--white);
  }
`;

export default function StyledBreadcrumb({ children }) {
  return (
    <CustomBreadcrumb>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {children}
      </Breadcrumbs>
    </CustomBreadcrumb>
  );
}
