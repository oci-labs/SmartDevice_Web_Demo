/* global expect */
import Adapter from 'enzyme-adapter-react-15';
import Enzyme, {shallow, render, mount} from 'enzyme';
import toJson, {shallowToJson} from 'enzyme-to-json';

Enzyme.configure({adapter: new Adapter()});

// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.shallowToJson = shallowToJson;
global.snapshot = component =>
  expect(shallowToJson(shallow(component))).toMatchSnapshot();
global.renderedSnapshot = (component, context) =>
  expect(toJson(render(component, context))).toMatchSnapshot();

// dummy mock for window.matchMedia which JSDom doesn't support
if (global.window) {
  global.window.matchMedia = () => ({matches: true});
}
