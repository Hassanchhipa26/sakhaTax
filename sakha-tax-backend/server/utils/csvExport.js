const escapeCsvField = (value) => {
  const str = String(value ?? '')
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

/**
 * Converts an array of inquiry documents to CSV text.
 */
export const inquiriesToCsv = (inquiries) => {
  const headers = ['Name', 'Mobile', 'Email', 'Service', 'Message', 'Status', 'Created At', 'Updated At']
  const rows = inquiries.map((inq) =>
    [
      inq.name,
      inq.mobile,
      inq.email,
      inq.service,
      inq.message,
      inq.status,
      inq.createdAt?.toISOString?.() || inq.createdAt,
      inq.updatedAt?.toISOString?.() || inq.updatedAt,
    ]
      .map(escapeCsvField)
      .join(',')
  )

  return [headers.join(','), ...rows].join('\n')
}

export default inquiriesToCsv
