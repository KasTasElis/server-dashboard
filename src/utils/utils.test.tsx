import { Server } from "../api";
import {
  getSortedServerData,
  sortServersByDistanceAscending,
  sortServersByDistanceDescending,
  sortServersByNameAscending,
  sortServersByNameDescending,
} from "./utils";

describe("Server sorting functions", () => {
  const servers: Server[] = [
    { name: "Germany", distance: 100 },
    { name: "Australia", distance: 200 },
    { name: "Canada", distance: 50 },
  ];

  const expectSorted = (sorted: Server[], expectedOrder: Server[]) => {
    expectedOrder.forEach((server, index) => {
      expect(sorted[index]).toEqual(server);
    });
  };

  test("sortServersByDistanceAscending", () => {
    const sorted = sortServersByDistanceAscending(servers);
    expectSorted(sorted, [servers[2], servers[0], servers[1]]);
  });

  test("sortServersByDistanceDescending", () => {
    const sorted = sortServersByDistanceDescending(servers);
    expectSorted(sorted, [servers[1], servers[0], servers[2]]);
  });

  test("sortServersByNameAscending", () => {
    const sorted = sortServersByNameAscending(servers);
    expectSorted(sorted, [servers[1], servers[2], servers[0]]);
  });

  test("sortServersByNameDescending", () => {
    const sorted = sortServersByNameDescending(servers);
    expectSorted(sorted, [servers[0], servers[2], servers[1]]);
  });

  test("getSortedServerData", () => {
    let sorted = getSortedServerData(servers, "distance-ascending");
    expectSorted(sorted, [servers[2], servers[0], servers[1]]);

    sorted = getSortedServerData(servers, "distance-descending");
    expectSorted(sorted, [servers[1], servers[0], servers[2]]);
  });
});
