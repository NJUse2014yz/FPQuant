package project.service.mapper;

import project.domain.*;
import project.service.dto.StockDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity Stock and its DTO StockDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface StockMapper {

    StockDTO stockToStockDTO(Stock stock);

    List<StockDTO> stocksToStockDTOs(List<Stock> stocks);

    Stock stockDTOToStock(StockDTO stockDTO);

    List<Stock> stockDTOsToStocks(List<StockDTO> stockDTOs);
}
