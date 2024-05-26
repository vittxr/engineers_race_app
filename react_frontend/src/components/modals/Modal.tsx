import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'

type Props = {
  title: string
  children: React.ReactNode
  isVisible: boolean
  setIsVisible: () => void
}

export default function Modal({ title, children, isVisible, setIsVisible}: Props) {
  return (
      <Transition appear show={isVisible}>
        <Dialog as="div" className="relative z-10 focus:outline-none" onClose={setIsVisible}>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform-[scale(95%)]"
                enterTo="opacity-100 transform-[scale(100%)]"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform-[scale(100%)]"
                leaveTo="opacity-0 transform-[scale(95%)]"
              >
                <DialogPanel className="w-full max-w-md rounded-xl bg-black/5 p-6 backdrop-blur-2xl">
                  <DialogTitle as="h3" className="text-base/7 font-medium text-black">
                    {title}
                  </DialogTitle>

                  {children}
                  {/* <p className="mt-2 text-sm/6 text-black/50">
                    Your payment has been successfully submitted. We’ve sent you an email with all of the details of
                    your order.
                  </p>
                  <div className="mt-4">
                    <Button
                      className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-black shadow-inner shadow-black/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-black"
                      onClick={close}
                    >
                      Got it, thanks!
                    </Button>
                  </div> */}
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
   
  )
}
