package project.web.rest;

import com.codahale.metrics.annotation.Timed;
import project.domain.Stock;

import project.repository.StockRepository;
import project.web.rest.util.HeaderUtil;
import project.service.dto.StockDTO;
import project.service.mapper.StockMapper;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * REST controller for managing Stock.
 */
@RestController
@RequestMapping("/api")
public class StockResource {

    private final Logger log = LoggerFactory.getLogger(StockResource.class);

    private static final String ENTITY_NAME = "stock";
        
    private final StockRepository stockRepository;

    private final StockMapper stockMapper;

    public StockResource(StockRepository stockRepository, StockMapper stockMapper) {
        this.stockRepository = stockRepository;
        this.stockMapper = stockMapper;
    }

    /**
     * POST  /stocks : Create a new stock.
     *
     * @param stockDTO the stockDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new stockDTO, or with status 400 (Bad Request) if the stock has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/stocks")
    @Timed
    public ResponseEntity<StockDTO> createStock(@RequestBody StockDTO stockDTO) throws URISyntaxException {
        log.debug("REST request to save Stock : {}", stockDTO);
        if (stockDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new stock cannot already have an ID")).body(null);
        }
        Stock stock = stockMapper.stockDTOToStock(stockDTO);
        stock = stockRepository.save(stock);
        StockDTO result = stockMapper.stockToStockDTO(stock);
        return ResponseEntity.created(new URI("/api/stocks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /stocks : Updates an existing stock.
     *
     * @param stockDTO the stockDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated stockDTO,
     * or with status 400 (Bad Request) if the stockDTO is not valid,
     * or with status 500 (Internal Server Error) if the stockDTO couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/stocks")
    @Timed
    public ResponseEntity<StockDTO> updateStock(@RequestBody StockDTO stockDTO) throws URISyntaxException {
        log.debug("REST request to update Stock : {}", stockDTO);
        if (stockDTO.getId() == null) {
            return createStock(stockDTO);
        }
        Stock stock = stockMapper.stockDTOToStock(stockDTO);
        stock = stockRepository.save(stock);
        StockDTO result = stockMapper.stockToStockDTO(stock);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, stockDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /stocks : get all the stocks.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of stocks in body
     */
    @GetMapping("/stocks")
    @Timed
    public List<StockDTO> getAllStocks() {
        log.debug("REST request to get all Stocks");
        List<Stock> stocks = stockRepository.findAll();
        return stockMapper.stocksToStockDTOs(stocks);
    }

    /**
     * GET  /stocks/:id : get the "id" stock.
     *
     * @param id the id of the stockDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the stockDTO, or with status 404 (Not Found)
     */
    @GetMapping("/stocks/{id}")
    @Timed
    public ResponseEntity<StockDTO> getStock(@PathVariable Long id) {
        log.debug("REST request to get Stock : {}", id);
        Stock stock = stockRepository.findOne(id);
        StockDTO stockDTO = stockMapper.stockToStockDTO(stock);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(stockDTO));
    }

    /**
     * DELETE  /stocks/:id : delete the "id" stock.
     *
     * @param id the id of the stockDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/stocks/{id}")
    @Timed
    public ResponseEntity<Void> deleteStock(@PathVariable Long id) {
        log.debug("REST request to delete Stock : {}", id);
        stockRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
