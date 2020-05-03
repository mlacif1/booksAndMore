import {cleanup} from '@testing-library/react';
import moment from "moment";
import { lastFridayForMonth } from "../index";

afterEach(cleanup);

it('should get lastFridayForMonth', () => {
    const momentObj = moment("2019-04-27T16:50:47.095Z");
    const lastFridayOfMonth = lastFridayForMonth(momentObj);
    expect(lastFridayOfMonth.date()).toEqual(31);
    expect(lastFridayOfMonth.month()).toEqual(3);
});