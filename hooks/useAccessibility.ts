/**
 * Custom hook to manage accessibility settings.
 *
 * @returns {Object} An object containing the current accessibility settings,
 * a function to change the zoom level, and a function to toggle accessibility options.
 *
 * @property {Object} accessibility - The current accessibility settings.
 * @property {number} accessibility.zoom - The current zoom level (default is 1).
 * @property {boolean} accessibility.grayscale - Whether grayscale mode is enabled.
 * @property {boolean} accessibility["invert-contrast"] - Whether invert contrast mode is enabled.
 * @property {boolean} accessibility["highlight-links"] - Whether highlight links mode is enabled.
 * @property {boolean} accessibility["highlight-headers"] - Whether highlight headers mode is enabled.
 * @property {boolean} accessibility["stop-animations"] - Whether stop animations mode is enabled.
 * @property {function} onZoomChange - Function to change the zoom level.
 * @param {number} dir - The direction to change the zoom level (positive to increase, negative to decrease).
 * @property {function} onChangeAccessibility - Function to toggle an accessibility option.
 * @param {keyof TAcccibility} name - The name of the accessibility option to toggle.
 */
import { TAcccibility } from "@/types/app.type";
import { useState } from "react";

export const useAccessibility = () => {
  const MIN_ZOOM = 1;
  const MAX_ZOOM = 3;

  const [accessibility, setAccessibility] = useState({
    zoom: 1,
    grayscale: false,
    "invert-contrast": false,
    "highlight-links": false,
    "highlight-headers": false,
    "stop-animations": false,
  });

  const onZoomChange = (dir: number) => {
    setAccessibility((prev) => {
      const { zoom } = prev;
      const newZoom = Number(zoom || MIN_ZOOM) + dir;
      if (newZoom > MAX_ZOOM) return prev;
      if (newZoom < MIN_ZOOM) return prev;
      return { ...prev, zoom: newZoom };
    });
  };

  const onChangeAccessibility = (name: keyof TAcccibility) => {
    setAccessibility((prev) => {
      return { ...prev, [name]: !prev[name] };
    });
  };

  return { accessibility, onZoomChange, onChangeAccessibility };
};
