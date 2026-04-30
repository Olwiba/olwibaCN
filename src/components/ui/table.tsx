import * as React from "react"

import { cn } from "@/lib/utils"

type TableSize = "sm" | "default" | "lg"

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  size?: TableSize
}

const TableSizeContext = React.createContext<TableSize>("default")

const tableTextSizes: Record<TableSize, string> = {
  sm: "text-xs",
  default: "text-sm",
  lg: "text-base",
}

const tableHeadSizes: Record<TableSize, string> = {
  sm: "h-9 px-3",
  default: "h-12 px-4",
  lg: "h-14 px-5",
}

const tableCellSizes: Record<TableSize, string> = {
  sm: "p-3",
  default: "p-4",
  lg: "p-5",
}

const tableCaptionSizes: Record<TableSize, string> = {
  sm: "mt-3 text-xs",
  default: "mt-4 text-sm",
  lg: "mt-4 text-sm",
}

const Table = React.forwardRef<
  HTMLTableElement,
  TableProps
>(({ className, size = "default", ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <TableSizeContext.Provider value={size}>
      <table
        ref={ref}
        className={cn("w-full caption-bottom", tableTextSizes[size], className)}
        {...props}
      />
    </TableSizeContext.Provider>
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => {
  const size = React.useContext(TableSizeContext)

  return (
    <th
      ref={ref}
      className={cn(
        "text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
        tableHeadSizes[size],
        className
      )}
      {...props}
    />
  )
})
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => {
  const size = React.useContext(TableSizeContext)

  return (
    <td
      ref={ref}
      className={cn(
        "align-middle [&:has([role=checkbox])]:pr-0",
        tableCellSizes[size],
        className
      )}
      {...props}
    />
  )
})
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => {
  const size = React.useContext(TableSizeContext)

  return (
    <caption
      ref={ref}
      className={cn(tableCaptionSizes[size], "text-muted-foreground", className)}
      {...props}
    />
  )
})
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
