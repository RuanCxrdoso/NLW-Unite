import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal, Search } from "lucide-react"
import { ChangeEvent, useEffect, useState } from "react"
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

interface AttendeesApiProps {
  id: string
  name: string
  email: string
  createdAt: string
  checkedInAt: string | null 
}

export function AttendeeList() {
  const [inputValue, setInputValue] = useState(() => {
    const url = new URL(window.location.toString())

    if (url.searchParams.has('search')) {
      return url.searchParams.get('search') ?? ''
    }

    return ''
  })
  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString())

    if (url.searchParams.has('pageIndex')) {
      return Number(url.searchParams.get('pageIndex'))
    }

    return 1
  })

  const [total, setTotal] = useState(0) // número total de 'attendees' retornados pela API (121)
  const [attendeesApi, setAttendeesApi] = useState<AttendeesApiProps[]>([])

  const pagesNumber = Math.ceil(total / 10)

  useEffect(() => {
    const url = new URL('http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees')

    url.searchParams.set('pageIndex', String(page - 1))

    if (inputValue.length > 0) {
      url.searchParams.set('query', inputValue)
    }

    fetch(url)
    .then(res => res.json())
    .then(data => {
      setAttendeesApi(data.attendees)
      setTotal(data.total)
    })
  }, [page, inputValue])

  function setCurrentSearch(inputValue: string) {
    const url = new URL(window.location.toString())

    url.searchParams.set('search', inputValue)

    window.history.pushState({}, '', url)

    setInputValue(inputValue)
  }

  function setCurrentPage(page: number) {
    const url = new URL(window.location.toString())

    url.searchParams.set('pageIndex', String(page))

    window.history.pushState({}, '', url)

    setPage(page)
  }

  function handleInputSearchChange(ev: ChangeEvent<HTMLInputElement>) {
    setCurrentSearch(ev.target.value)
    setCurrentPage(1)
  }

  function goToNextPage() {
    setCurrentPage(page + 1)
  }

  function goToPreviousPage() {
    setCurrentPage(page - 1)
  }

  function goToLastPage() {
    setCurrentPage(pagesNumber)
  }

  function goToFirstPage() {
    setCurrentPage(1)
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="flex items-center gap-3 px-3 py-1.5 w-72 border border-white/10 outline-none rounded-lg text-sm">
          <Search className="size-4 text-emerald-300" />
          <input onChange={handleInputSearchChange} placeholder="Buscar participante..." value={inputValue} className="flex-1 bg-transparent focus:ring-0 border-0 p-0 text-sm" />
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
          {attendeesApi.map((attendee) => {
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
                  {attendee.checkedInAt === null ? <span className="text-zinc-400">Não fez check-in</span> : dayjs().to(attendee.checkedInAt)}
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
              Mostrando {attendeesApi.length} de {total} itens
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
