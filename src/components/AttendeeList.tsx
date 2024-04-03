import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal, Search } from "lucide-react"
import { ChangeEvent, useState } from "react"
import { attendees } from "../data/attendees"

import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'

import { IconButton } from "./IconButton"
import { Table } from "./Table/Table"
import { TableHeader } from "./Table/TableHeader"
import { TableCell } from "./Table/TableCell"
import { TableRow } from "./Table/TableRow"

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export function AttendeeList() {
  const [inputValue, setInputValue] = useState('')
  const [page, setPage] = useState(1)

  const pagesNumber = Math.ceil(attendees.length / 10)

  function handleInputSearchChange(ev: ChangeEvent<HTMLInputElement>) {
    setInputValue(ev.target.value)
  }

  function goToNextPage() {
    setPage(page + 1)
  }

  function goToPreviousPage() {
    setPage(page - 1)
  }

  function goToLastPage() {
    setPage(pagesNumber)
  }

  function goToFirstPage() {
    setPage(1)
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="flex items-center gap-3 px-3 py-1.5 w-72 border border-white/10 outline-none rounded-lg text-sm">
          <Search className="size-4 text-emerald-300" />
          <input onChange={handleInputSearchChange} placeholder="Buscar participante..." value={inputValue} className="flex-1 bg-transparent outline-none border-0 p-0 text-sm" />
        </div>
      </div>

      <Table>
        <thead>
          <tr className="border-b border-white/10">
            <TableHeader style={{ width: 48 }}>
              <input type="checkbox" className="size-4 bg-black/20 rounded focus:border-none border-white/10" />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Participante</TableHeader>
            <TableHeader>Data de inscrição</TableHeader>
            <TableHeader>Data de check-in</TableHeader>
            <TableHeader style={{ width: 64 }}></TableHeader>
          </tr>
        </thead>

        <tbody>
          {attendees.slice((page - 1) * 10, page * 10).map((attendee) => {
            return (
              <TableRow key={attendee.id}>
                <TableCell>
                  <input type="checkbox" className="size-4 bg-black/20 rounded border-white/10" />
                </TableCell>

                <TableCell>
                  {attendee.id}
                </TableCell>

                <TableCell className="flex flex-col gap-0.5 py-3 px-4 text-sm text-zinc-300">
                  <span className="font-semibold text-white">{attendee.name}</span>
                  <span className="text-white/60">{attendee.email}</span>
                </TableCell>

                <TableCell>
                  {dayjs().to(attendee.createdAt)}
                </TableCell>

                <TableCell>
                  {dayjs().to(attendee.checkedInAt)}
                </TableCell>

                <TableCell>
                  <IconButton transparent >
                    <MoreHorizontal className="size-4" />
                  </IconButton>
                </TableCell>
              </TableRow>
            )
          })}
        </tbody>

        <tfoot>
          <tr>
            <TableCell colSpan={3}>
              Mostrando {attendees.slice((page - 1) * 10, page * 10).length} de {attendees.length} itens
            </TableCell>

            <TableCell textRight colSpan={3}>
              <div className="items-center gap-8 inline-flex">
                <span>Página {page} de {pagesNumber}</span>

                <div className="flex gap-1.5">
                  <IconButton onClick={goToFirstPage} disabled={page === 1}>
                    <ChevronsLeft className="size-4" />
                  </IconButton>

                  <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                    <ChevronLeft className="size-4" />
                  </IconButton>

                  <IconButton onClick={goToNextPage} disabled={page === pagesNumber}>
                    <ChevronRight className="size-4" />
                  </IconButton>

                  <IconButton onClick={goToLastPage} disabled={page === pagesNumber}>
                    <ChevronsRight className="size-4" />
                  </IconButton>
                </div>
              </div>
            </TableCell>
          </tr>
        </tfoot>
      </Table>
    </div>
  )
}
