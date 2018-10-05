import React from 'react';
import renderer from 'react-test-renderer';
import { Field } from './field';

test('Field', () => {
  const component = renderer.create(<Field name="foo" value="bar" />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
