import { IEvent } from "@/lib/database/models/event.model";
import { Button } from "../ui/button"

const Checkout = ({ event, userId }: { event: IEvent; userId: string }) => {
    const onCheckout = async () => {

    }
  return (
    <form action={onCheckout} method="post">
        <Button type="submit" size="lg" role="link" className="button sm:w-fit">
            { event.isFree ? "Get Tickets" : "Buy Tickets" }
        </Button>
    </form>
  )
}

export default Checkout
