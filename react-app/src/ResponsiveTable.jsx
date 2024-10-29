import React, {useState} from 'react';

const ResponsiveTable = ({ data, columnHeaders,  title, footer}) => {
  return (
    <div className="table-container">
      {title && title!="" && <h1>{title}</h1>}
      {!data || data.length == 0 && <p>There is no data.</p>}
      {data && data.length > 0 &&
      (<table className={["responsive-table","table responsive-table"].join(" ")}>
        <thead>
          <tr>
            {columnHeaders.map((c) => {
              return <th key={c.name} width={c.width} className="th-column">{c.name}</th>
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {Object.keys(row).map((key) => {
                return <td key={`${JSON.stringify(row[key])} ${index} ${key}`}>{row[key]}</td>;
              })}
            </tr>
          ))}
        </tbody>
        {footer && (<tfoot>
          {footer.map((f, index) => {
            return (<tr key={`${JSON.stringify(f)} ${index}`}>
              {Object.keys(f).map((key) => {
                return <th key={`${JSON.stringify(f[key])} ${index} ${key}`}>{`${f[key]}`}</th>;
              })}
            </tr>)
          })}
        </tfoot>)}
      </table>)}
    </div>
  );
};

export default ResponsiveTable;