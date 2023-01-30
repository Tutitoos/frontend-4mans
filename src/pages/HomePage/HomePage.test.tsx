import renderWithProviders from "../../mocks/renderWithProviders";
import HomePage from "./HomePage";
import { act, screen } from "@testing-library/react";

describe("Given the HomePage component", () => {
  describe("When it is rendered", () => {
    test("Then it should show on the screen the title of each section", () => {
      const expectedOurTeamSectionTitle = "Nuestro Equipo";
      const expectedProjectsSectionTitle = "Proyectos";
      const expectedServicesSectionTitle = "Servicios";
      const expectedProcessSectionTitle = "Proceso";
      const expectedOpinionsSectionTitle = "Opiniones";

      renderWithProviders(<HomePage />);

      const resultOurTeamSectionTitle = screen.queryByRole("heading", {
        level: 2,
        name: expectedOurTeamSectionTitle,
      }) as HTMLHeadingElement;
      const resultProjectsSectionTitle = screen.queryByRole("heading", {
        level: 2,
        name: expectedProjectsSectionTitle,
      }) as HTMLHeadingElement;
      const resultServicesSectionTitle = screen.queryByRole("heading", {
        level: 2,
        name: expectedServicesSectionTitle,
      }) as HTMLHeadingElement;
      const resultProcessSectionTitle = screen.queryByRole("heading", {
        level: 2,
        name: expectedProcessSectionTitle,
      }) as HTMLHeadingElement;
      const resultOpinionsSectionTitle = screen.queryByRole("heading", {
        level: 2,
        name: expectedOpinionsSectionTitle,
      }) as HTMLHeadingElement;

      expect(resultOurTeamSectionTitle).toBeInTheDocument();
      expect(resultProjectsSectionTitle).toBeInTheDocument();
      expect(resultServicesSectionTitle).toBeInTheDocument();
      expect(resultProcessSectionTitle).toBeInTheDocument();
      expect(resultOpinionsSectionTitle).toBeInTheDocument();
      expect(resultOurTeamSectionTitle.textContent).toEqual(expectedOurTeamSectionTitle);
      expect(resultProjectsSectionTitle.textContent).toEqual(expectedProjectsSectionTitle);
      expect(resultServicesSectionTitle.textContent).toEqual(expectedServicesSectionTitle);
      expect(resultProcessSectionTitle.textContent).toEqual(expectedProcessSectionTitle);
      expect(resultOpinionsSectionTitle.textContent).toEqual(expectedOpinionsSectionTitle);
    });

    let originalWindow: Window & typeof globalThis;

    const mockResize = jest.fn();

    beforeEach(() => {
      originalWindow = global.window;
      global.window = { ...originalWindow };
      Object.defineProperty(global.window, "innerWidth", {
        configurable: true,
        value: 1000,
      });
      Object.defineProperty(global.window, "innerHeight", {
        configurable: true,
        value: 800,
      });
      global.window.addEventListener("resize", mockResize);
    });

    afterEach(() => {
      global.window = originalWindow;
    });

    test("Then it should resize", () => {
      renderWithProviders(<HomePage />);

      global.window.innerWidth = 500;
      global.window.innerHeight = 400;

      act(() => {
        global.dispatchEvent(new Event("resize"));
      });

      expect(global.window.innerWidth).toBe(500);
      expect(global.window.innerHeight).toBe(400);

      expect(mockResize).toHaveBeenCalled();
    });
  });
});
