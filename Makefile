PORT := 8080
PIPED_API := pipedapi.ducks.party

all:
	@deno run --allow-net=0.0.0.0:$(PORT),$(PIPED_API) main.js $(PIPED_API) $(PORT)