import { render } from '@testing-library/react';
import { Table } from "./Table" // Update with your actual import path

const servers = [
    {name: "Lithuania", distance: 123},
    {name: "Germany", distance: 1050},
    {name: "Austria", distance: 500}
];

test('renders Table component with correct data in the initial order', () => {
    const { getByRole } = render(<Table data={servers} />);
    const tableElement = getByRole('table');
    expect(tableElement).toBeInTheDocument();

    const tableRows = tableElement.querySelectorAll('tr');
    expect(tableRows.length).toBe(servers.length + 1); // 3 rows + 1 header

    const tableHeaders = tableElement.querySelectorAll('th');
    expect(tableHeaders.length).toBe(2); // 2 headers

    const tableData = tableElement.querySelectorAll('td');
    expect(tableData.length).toBe(servers.length * 2); // 3 rows * 2 columns

    expect(tableData[0].textContent).toBe("Lithuania");
    expect(tableData[1].textContent).toBe("123");
    expect(tableData[2].textContent).toBe("Germany");
    expect(tableData[3].textContent).toBe("1050");
});

// TODO: test sorting