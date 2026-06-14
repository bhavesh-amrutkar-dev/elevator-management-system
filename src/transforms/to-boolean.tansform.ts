// src/common/transforms/to-boolean.transform.ts

import { Transform } from "class-transformer";

export const ToBoolean = () =>
  Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  });