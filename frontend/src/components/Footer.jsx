const Footer = () => {
  return (
    <footer className="py-6 md:px-8 md:py-0 bg-black text-white border-t border-gray-800">
        <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
            <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                Built by {" "}
                <a 
                    href="https://github.com/shubhamavhad96"
                    target="_blank"
                    className="fontmedium underline underline-offset-4"    
                >
                    Shubham Avhad
                </a>
                . The Source code is available on {" "}
                <a 
                    href="https://github.com/shubhamavhad96"
                    target="_blank"
                    rel="noreferrer"                                    // meaning of this in in simple words is that it will not allow the website to know from where the user is coming from
                    className="fontmedium underline underline-offset-4"
                >
                    Github
                </a>
                .
            </p>
        </div>
    </footer>
  )
}

export default Footer